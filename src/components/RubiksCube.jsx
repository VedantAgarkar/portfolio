import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// 10 moves to scramble and unscramble the cube
const MOVES = [
  { axis: 'y', layer: 1, angle: Math.PI / 2 },   // U
  { axis: 'x', layer: 1, angle: -Math.PI / 2 },  // R
  { axis: 'z', layer: 1, angle: Math.PI / 2 },   // F
  { axis: 'y', layer: -1, angle: -Math.PI / 2 }, // D
  { axis: 'x', layer: -1, angle: Math.PI / 2 },  // L
  { axis: 'z', layer: -1, angle: -Math.PI / 2 }, // B
  { axis: 'y', layer: 0, angle: Math.PI / 2 },   // E (Horizontal middle)
  { axis: 'x', layer: 1, angle: Math.PI / 2 },   // R again
  { axis: 'z', layer: 1, angle: -Math.PI / 2 },  // F again
  { axis: 'y', layer: 1, angle: -Math.PI / 2 }   // U again
]

const AXES = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 1, 0),
  z: new THREE.Vector3(0, 0, 1)
}

export default function RubiksCube() {
  const containerRef = useRef(null)
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    let width = container.clientWidth
    let height = container.clientHeight

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 8

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Set canvas element styles to let clicks pass through
    renderer.domElement.style.pointerEvents = 'none'

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    // Main directional light (top-right-front)
    const dirLightRight = new THREE.DirectionalLight(0xffffff, 2.5)
    dirLightRight.position.set(6, 10, 6)
    scene.add(dirLightRight)

    // Fill directional light (top-left-front)
    const dirLightLeft = new THREE.DirectionalLight(0xffffff, 2.0)
    dirLightLeft.position.set(-6, 6, 6)
    scene.add(dirLightLeft)

    // Direct key light (front-center) to illuminate camera-facing surfaces
    const keyLightFront = new THREE.DirectionalLight(0xffffff, 1.8)
    keyLightFront.position.set(0, 0, 10)
    scene.add(keyLightFront)

    // Glossy Purple Point Light
    const purpleLight = new THREE.PointLight(0xD000FF, 8, 15)
    purpleLight.position.set(4, 4, 4)
    scene.add(purpleLight)

    // Lime green point light (website theme color reflection)
    const greenLight = new THREE.PointLight(0xC8FF00, 5, 15)
    greenLight.position.set(-4, -4, 4)
    scene.add(greenLight)

    // Cyan point light for dual-tone tech reflection
    const cyanLight = new THREE.PointLight(0x00FFFF, 4.5, 15)
    cyanLight.position.set(-4, 4, -4)
    scene.add(cyanLight)

    // Materials definitions
    // Glossy metallic purple body color
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x480ca8, // Bright royal purple metallic pigment
      roughness: 0.15,
      metalness: 0.65
    })

    // Glossy metallic purple/cyan/lime theme colors for faces
    const faceColors = {
      right: 0xf72585,  // Neon Pink
      left: 0x7209b7,   // Glossy Medium Violet
      top: 0xb5179e,    // Glossy Bright Purple
      bottom: 0x3f37c9, // Glossy Indigo Blue
      front: 0xC8FF00,  // Website Accent Lime Green
      back: 0x4cc9f0    // Glossy Electric Cyan
    }

    const faceMats = {
      right: new THREE.MeshStandardMaterial({ color: faceColors.right, roughness: 0.1, metalness: 0.5 }),
      left: new THREE.MeshStandardMaterial({ color: faceColors.left, roughness: 0.1, metalness: 0.5 }),
      top: new THREE.MeshStandardMaterial({ color: faceColors.top, roughness: 0.1, metalness: 0.5 }),
      bottom: new THREE.MeshStandardMaterial({ color: faceColors.bottom, roughness: 0.1, metalness: 0.5 }),
      front: new THREE.MeshStandardMaterial({ color: faceColors.front, roughness: 0.1, metalness: 0.4 }),
      back: new THREE.MeshStandardMaterial({ color: faceColors.back, roughness: 0.1, metalness: 0.5 })
    }

    // Geometry for a single cubie
    const cubieGeo = new THREE.BoxGeometry(0.92, 0.92, 0.92)

    // Create Rubik's cube group
    const cubeGroup = new THREE.Group()
    scene.add(cubeGroup)

    const cubies = []

    // Build the 3x3x3 grid of cubies
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          const materials = [
            x === 1 ? faceMats.right : bodyMat,   // Right (x+)
            x === -1 ? faceMats.left : bodyMat,   // Left (x-)
            y === 1 ? faceMats.top : bodyMat,     // Top (y+)
            y === -1 ? faceMats.bottom : bodyMat, // Bottom (y-)
            z === 1 ? faceMats.front : bodyMat,   // Front (z+)
            z === -1 ? faceMats.back : bodyMat    // Back (z-)
          ]

          const cubie = new THREE.Mesh(cubieGeo, materials)
          cubie.position.set(x, y, z)
          cubeGroup.add(cubie)

          cubies.push({
            mesh: cubie,
            initialPos: new THREE.Vector3(x, y, z)
          })
        }
      }
    }

    // Interactive mouse rotation tracking
    let targetRotationX = 0.3
    let targetRotationY = -0.5
    let currentRotationX = 0.3
    let currentRotationY = -0.5
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0

    // Temporary vector to project cube position to screen coordinates
    const tempV = new THREE.Vector3()

    // Helper to calculate distance from mouse to cube screen-space center
    const checkHoverCube = (clientX, clientY) => {
      if (!cubeGroup) return false
      
      cubeGroup.getWorldPosition(tempV)
      tempV.project(camera)
      
      const cubeScreenX = (tempV.x * 0.5 + 0.5) * width
      const cubeScreenY = (-(tempV.y * 0.5) + 0.5) * height
      
      const dx = clientX - cubeScreenX
      const dy = clientY - cubeScreenY
      const dist = Math.sqrt(dx * dx + dy * dy)
      
      // Dynamic interaction radius based on desktop/mobile and docking state
      const scrollY = window.scrollY
      const dockProgress = isDesktop ? Math.min(scrollY / (window.innerHeight * 0.5), 1) : 0
      const baseRadius = isDesktop ? (1.0 - dockProgress * 0.6) * 180 : 140
      
      return dist < Math.max(50, baseRadius)
    }

    const handleMouseDown = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('.btn-primary') || e.target.closest('.btn-outline')) {
        return
      }

      if (checkHoverCube(e.clientX, e.clientY)) {
        isDragging = true
        prevMouseX = e.clientX
        prevMouseY = e.clientY
      }
    }

    const handleMouseMove = (e) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY
        targetRotationY += deltaX * 0.008
        targetRotationX += deltaY * 0.008
        prevMouseX = e.clientX
        prevMouseY = e.clientY
      } else {
        // Simple tilt towards cursor when hovering nearby
        const rect = container.getBoundingClientRect()
        const mx = ((e.clientX - rect.left) / width) * 2 - 1
        const my = -((e.clientY - rect.top) / height) * 2 + 1
        
        if (checkHoverCube(e.clientX, e.clientY)) {
          targetRotationY = -0.5 + mx * 0.5
          targetRotationX = 0.3 - my * 0.5
        } else {
          // Slowly return to base rotation angle
          targetRotationY += (-0.5 - targetRotationY) * 0.02
          targetRotationX += (0.3 - targetRotationX) * 0.02
        }
      }
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    // Touch support
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        const clientX = e.touches[0].clientX
        const clientY = e.touches[0].clientY
        if (checkHoverCube(clientX, clientY)) {
          isDragging = true
          prevMouseX = clientX
          prevMouseY = clientY
        }
      }
    }

    const handleTouchMove = (e) => {
      if (isDragging && e.touches.length === 1) {
        const clientX = e.touches[0].clientX
        const clientY = e.touches[0].clientY
        const deltaX = clientX - prevMouseX
        const deltaY = clientY - prevMouseY
        targetRotationY += deltaX * 0.008
        targetRotationX += deltaY * 0.008
        prevMouseX = clientX
        prevMouseY = clientY
      }
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleMouseUp)

    // Animation loop
    let animationFrameId

    const animate = () => {
      // Calculate scroll progress
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const s = maxScroll > 0 ? scrollY / maxScroll : 0

      // Scramble progress: starts solved (0), fully scrambled around mid-scroll (0.5), solved at bottom (1.0)
      let f = 0
      if (s < 0.45) {
        f = s / 0.45
      } else if (s >= 0.45 && s <= 0.55) {
        f = 1.0
      } else {
        f = Math.max(0, (1.0 - s) / 0.45)
      }

      // Smoothly rotate the cube group
      currentRotationX += (targetRotationX - currentRotationX) * 0.08
      currentRotationY += (targetRotationY - currentRotationY) * 0.08

      // Slow ambient spin added on top
      cubeGroup.rotation.x = currentRotationX + Math.sin(Date.now() * 0.0005) * 0.08
      cubeGroup.rotation.y = currentRotationY + Date.now() * 0.0002

      // Position & scale interpolation based on screen size & scroll progress
      const aspect = width / height
      if (isDesktop) {
        // Desktop zig-zag path: oscillates horizontally from right to left to right,
        // and eventually docks to the bottom-right corner at the bottom of the page.
        
        // Horizontal oscillation path: Right (s=0) -> Left (s=0.25) -> Right (s=0.5) -> Left (s=0.75) -> Right (s=1.0)
        // Amplitude: aspect * 1.5
        const maxOscX = aspect * 1.5
        const zigZagX = Math.cos(s * Math.PI * 4) * maxOscX
        const zigZagY = 0

        // Docking target: bottom-right corner
        const dockedX = aspect * 2.2 - 0.7
        const dockedY = -2.0

        // Settle transition factor at the very bottom (last 15% of scroll)
        const dockProgress = Math.min(Math.max((s - 0.85) / 0.15, 0), 1)

        cubeGroup.position.x = zigZagX + (dockedX - zigZagX) * dockProgress
        cubeGroup.position.y = zigZagY + (dockedY - zigZagY) * dockProgress
        
        // Scale: floats slightly larger in background, then shrinks down to dock size
        const baseScale = 1.2
        const dockedScale = 0.4
        cubeGroup.scale.setScalar(baseScale + (dockedScale - baseScale) * dockProgress)
      } else {
        // Mobile/Tablet: centered in its container, behaves as a static inline element
        cubeGroup.position.set(0, 0, 0)
        cubeGroup.scale.setScalar(0.9)
      }

      // Physics explode gap: cubies drift apart as they scramble
      const spacing = 1.04 + f * 0.22

      // Calculate Rubik's cube states by applying moves sequentially
      cubies.forEach((cubie) => {
        // Reset to initial solved grid position
        cubie.mesh.position.copy(cubie.initialPos)
        cubie.mesh.quaternion.set(0, 0, 0, 1)

        // Apply completed and active moves
        MOVES.forEach((move, index) => {
          // Progress of the current move (0 to 1)
          const moveStart = index / MOVES.length
          const moveEnd = (index + 1) / MOVES.length
          const moveProgress = Math.min(Math.max((f - moveStart) / (moveEnd - moveStart), 0), 1)
          const angle = move.angle * moveProgress

          if (angle !== 0) {
            // Check if cubie belongs to the moving layer (with float tolerance)
            const cubiePosInAxis = cubie.mesh.position[move.axis]
            if (Math.abs(cubiePosInAxis - move.layer) < 0.1) {
              const rotQuat = new THREE.Quaternion().setFromAxisAngle(AXES[move.axis], angle)
              cubie.mesh.position.applyQuaternion(rotQuat)
              cubie.mesh.quaternion.premultiply(rotQuat)
            }
          }
        })

        // Apply explode spacing
        cubie.mesh.position.multiplyScalar(spacing)
      })

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Handle Resize
    const handleResize = () => {
      width = container.clientWidth
      height = container.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }

      // Dispose webgl resources
      cubies.forEach((c) => {
        c.mesh.geometry.dispose()
      })
      cubieGeo.dispose()
      bodyMat.dispose()
      Object.values(faceMats).forEach((m) => m.dispose())
      renderer.dispose()
    }
  }, [isDesktop])

  return (
    <div
      ref={containerRef}
      className={`${
        isDesktop
          ? 'fixed top-0 right-0 w-full h-screen pointer-events-none z-0 lg:block hidden'
          : 'relative w-full h-[400px] pointer-events-none'
      }`}
      style={{
        pointerEvents: 'none'
      }}
    />
  )
}
