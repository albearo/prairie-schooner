import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Game constants ───────────────────────────────────────────────────────────
const W = 800, H = 400
const GROUND_Y = 300
const WAGON_W = 80, WAGON_H = 50
const WHEEL_R = 18

const RANDOM_EVENTS = [
  { msg: 'You have dysentery.', penalty: 'health', value: 25 },
  { msg: 'Broken wagon axle!', penalty: 'speed', value: 0.4 },
  { msg: 'A snake bit your ox!', penalty: 'health', value: 15 },
  { msg: 'Heavy rains slow progress.', penalty: 'speed', value: 0.6 },
  { msg: 'You spot a buffalo!', penalty: 'food', value: -40 },
  { msg: 'River crossing ahead...', penalty: 'none', value: 0 },
  { msg: 'Bandit attack! Lost supplies.', penalty: 'food', value: 20 },
  { msg: 'Beautiful day on the trail. +morale', penalty: 'none', value: 0 },
]

// ─── Drawing helpers ──────────────────────────────────────────────────────────
function drawGround(ctx, offset) {
  // Sky gradient
  const sky = ctx.createLinearGradient(0, 0, 0, GROUND_Y)
  sky.addColorStop(0, '#001a00')
  sky.addColorStop(1, '#003300')
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, W, GROUND_Y)

  // Ground
  ctx.fillStyle = '#1a4f00'
  ctx.fillRect(0, GROUND_Y, W, H - GROUND_Y)

  // Trail path
  ctx.fillStyle = '#2a3a00'
  ctx.fillRect(0, GROUND_Y + 10, W, 40)

  // Scrolling ground detail
  for (let i = 0; i < 8; i++) {
    const x = ((i * 120 - offset % 120) + W) % W
    ctx.fillStyle = '#152a00'
    ctx.beginPath()
    ctx.ellipse(x, GROUND_Y + 15, 15, 5, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  // Stars
  ctx.fillStyle = '#33ff33'
  for (let i = 0; i < 40; i++) {
    const sx = ((i * 37 + 7) % W)
    const sy = ((i * 23 + 5) % (GROUND_Y - 20)) + 5
    const blink = Math.sin(Date.now() / 500 + i) > 0.5 ? 1 : 0.4
    ctx.globalAlpha = blink * 0.6
    ctx.fillRect(sx, sy, 1, 1)
  }
  ctx.globalAlpha = 1
}

function drawWagon(ctx, x, y, wheelAngle, damaged) {
  const g = ctx.createLinearGradient(0, 0, 0, 1)

  // Canvas/cover
  ctx.strokeStyle = damaged ? '#886600' : '#33ff33'
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.quadraticCurveTo(x + WAGON_W / 2, y - 28, x + WAGON_W, y)
  ctx.stroke()

  // Ribs
  ctx.lineWidth = 0.8
  ctx.globalAlpha = 0.5
  for (let i = 1; i < 5; i++) {
    const rx = x + (WAGON_W / 5) * i
    ctx.beginPath()
    ctx.moveTo(rx, y)
    ctx.quadraticCurveTo(rx, y - 22, rx - 5, y - 24)
    ctx.stroke()
  }
  ctx.globalAlpha = 1

  // Body
  ctx.fillStyle = damaged ? '#442200' : '#1a4a00'
  ctx.strokeStyle = damaged ? '#886600' : '#33ff33'
  ctx.lineWidth = 1.5
  ctx.fillRect(x - 5, y, WAGON_W + 10, WAGON_H - 20)
  ctx.strokeRect(x - 5, y, WAGON_W + 10, WAGON_H - 20)

  // Wheels
  ;[[x + 10, y + WAGON_H - 18], [x + WAGON_W - 10, y + WAGON_H - 18]].forEach(([wx, wy]) => {
    // Outer ring
    ctx.strokeStyle = damaged ? '#886600' : '#33ff33'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(wx, wy, WHEEL_R, 0, Math.PI * 2)
    ctx.stroke()
    // Hub
    ctx.fillStyle = damaged ? '#886600' : '#33ff33'
    ctx.beginPath()
    ctx.arc(wx, wy, 3, 0, Math.PI * 2)
    ctx.fill()
    // Spokes
    ctx.lineWidth = 1
    for (let s = 0; s < 6; s++) {
      const angle = wheelAngle + (s * Math.PI) / 3
      ctx.beginPath()
      ctx.moveTo(wx + Math.cos(angle) * 3, wy + Math.sin(angle) * 3)
      ctx.lineTo(wx + Math.cos(angle) * WHEEL_R, wy + Math.sin(angle) * WHEEL_R)
      ctx.stroke()
    }
  })

  // Tongue/hitch
  ctx.lineWidth = 1.5
  ctx.beginPath()
  ctx.moveTo(x - 5, y + 15)
  ctx.lineTo(x - 25, y + 25)
  ctx.stroke()
}

function drawCactus(ctx, x) {
  ctx.strokeStyle = '#33ff33'
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(x, GROUND_Y + 10)
  ctx.lineTo(x, GROUND_Y - 30)
  ctx.stroke()
  // Arms
  ctx.beginPath()
  ctx.moveTo(x - 15, GROUND_Y - 15)
  ctx.lineTo(x, GROUND_Y - 15)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x + 15, GROUND_Y - 20)
  ctx.lineTo(x, GROUND_Y - 20)
  ctx.stroke()
}

function drawBuffalo(ctx, x) {
  ctx.fillStyle = '#33ff33'
  ctx.globalAlpha = 0.7
  // Body
  ctx.beginPath()
  ctx.ellipse(x, GROUND_Y - 15, 18, 12, 0, 0, Math.PI * 2)
  ctx.fill()
  // Head
  ctx.beginPath()
  ctx.ellipse(x - 20, GROUND_Y - 20, 10, 8, 0.3, 0, Math.PI * 2)
  ctx.fill()
  // Hump
  ctx.beginPath()
  ctx.ellipse(x + 5, GROUND_Y - 26, 8, 6, -0.3, 0, Math.PI * 2)
  ctx.fill()
  // Legs
  ctx.lineWidth = 2
  ctx.strokeStyle = '#33ff33'
  ;[[-10, 0], [-3, 0], [5, 0], [12, 0]].forEach(([dx, dy]) => {
    ctx.beginPath()
    ctx.moveTo(x + dx, GROUND_Y - 4)
    ctx.lineTo(x + dx, GROUND_Y + 5)
    ctx.stroke()
  })
  ctx.globalAlpha = 1
}

function drawHUD(ctx, stats) {
  ctx.fillStyle = 'rgba(0,20,0,0.7)'
  ctx.fillRect(0, 0, W, 36)

  ctx.font = '11px Courier New'
  ctx.fillStyle = '#33ff33'
  const items = [
    `MILES: ${stats.miles}`,
    `FOOD: ${stats.food} lbs`,
    `HEALTH: ${stats.health}%`,
    `SCORE: ${stats.score}`,
  ]
  items.forEach((item, i) => {
    ctx.fillText(item, 12 + i * 195, 22)
  })

  // Health bar
  const hx = W - 120, hy = 10
  ctx.strokeStyle = '#1a4f1a'
  ctx.strokeRect(hx, hy, 100, 14)
  const hColor = stats.health > 60 ? '#33ff33' : stats.health > 30 ? '#ffff33' : '#ff3333'
  ctx.fillStyle = hColor
  ctx.fillRect(hx + 1, hy + 1, (stats.health / 100) * 98, 12)
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function OregonTrailGame({ onClose }) {
  const canvasRef = useRef(null)
  const stateRef = useRef({
    offset: 0,
    wheelAngle: 0,
    wagonY: GROUND_Y - WAGON_H + 2,
    velocity: 0,
    jumping: false,
    stats: { miles: 0, food: 200, health: 100, score: 0 },
    obstacles: [],
    animals: [],
    damaged: false,
    gameOver: false,
    dead: false,
    eventTimer: 0,
    spawnTimer: 0,
    frameId: null,
  })

  const [event, setEvent] = useState(null)
  const [dead, setDead] = useState(false)
  const [score, setScore] = useState(0)

  const jump = useCallback(() => {
    const s = stateRef.current
    if (!s.jumping && !s.gameOver) {
      s.velocity = -10
      s.jumping = true
    }
  }, [])

  const dismissEvent = useCallback(() => setEvent(null), [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const state = stateRef.current

    // Reset
    Object.assign(state, {
      offset: 0, wheelAngle: 0,
      wagonY: GROUND_Y - WAGON_H + 2,
      velocity: 0, jumping: false,
      stats: { miles: 0, food: 200, health: 100, score: 0 },
      obstacles: [], animals: [],
      damaged: false, gameOver: false, dead: false,
      eventTimer: 180, spawnTimer: 60,
    })

    let lastTime = 0

    function gameLoop(time) {
      const dt = Math.min((time - lastTime) / 16, 3)
      lastTime = time

      if (state.gameOver) {
        setScore(state.stats.score)
        setDead(true)
        return
      }

      const SPEED = 3

      // Update
      state.offset += SPEED * dt
      state.wheelAngle += (SPEED * dt * 0.08)
      state.stats.miles = Math.floor(state.offset / 30)
      state.stats.score = state.stats.miles + Math.floor(state.stats.food / 5)

      // Gravity / jump
      if (state.jumping || state.wagonY < GROUND_Y - WAGON_H + 2) {
        state.velocity += 0.5 * dt
        state.wagonY += state.velocity * dt
        if (state.wagonY >= GROUND_Y - WAGON_H + 2) {
          state.wagonY = GROUND_Y - WAGON_H + 2
          state.velocity = 0
          state.jumping = false
        }
      }

      // Spawn obstacles
      state.spawnTimer -= dt
      if (state.spawnTimer <= 0) {
        state.spawnTimer = 80 + Math.random() * 60
        if (Math.random() < 0.65) {
          state.obstacles.push({ x: W + 20, type: 'cactus' })
        } else {
          state.animals.push({ x: W + 20 })
        }
      }

      // Move obstacles
      state.obstacles = state.obstacles
        .map(o => ({ ...o, x: o.x - SPEED * dt }))
        .filter(o => o.x > -40)

      state.animals = state.animals
        .map(a => ({ ...a, x: a.x - SPEED * 0.6 * dt }))
        .filter(a => a.x > -40)

      // Collision
      const wx = 80, wy = state.wagonY
      state.obstacles.forEach(o => {
        if (Math.abs(o.x - wx) < 35 && wy > GROUND_Y - 60) {
          state.stats.health -= 20
          state.damaged = true
          setTimeout(() => { if (stateRef.current) stateRef.current.damaged = false }, 400)
          state.obstacles = state.obstacles.filter(ob => ob !== o)
        }
      })

      // Food depletion
      state.stats.food = Math.max(0, state.stats.food - 0.02 * dt)
      if (state.stats.food <= 0) state.stats.health -= 0.05 * dt

      // Death
      if (state.stats.health <= 0) {
        state.gameOver = true
        state.dead = true
      }

      // Random events
      state.eventTimer -= dt
      if (state.eventTimer <= 0) {
        state.eventTimer = 300 + Math.random() * 200
        const ev = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)]
        if (ev.penalty === 'health') state.stats.health = Math.max(0, state.stats.health - ev.value)
        if (ev.penalty === 'food') state.stats.food = Math.max(0, state.stats.food - ev.value)
        setEvent(ev.msg)
        setTimeout(() => setEvent(null), 3000)
      }

      // Draw
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = '#000a00'
      ctx.fillRect(0, 0, W, H)

      drawGround(ctx, state.offset)

      state.animals.forEach(a => drawBuffalo(ctx, a.x))
      state.obstacles.forEach(o => drawCactus(ctx, o.x))

      drawWagon(ctx, 80, state.wagonY, state.wheelAngle, state.damaged)

      drawHUD(ctx, state.stats)

      // Instructions
      ctx.fillStyle = '#1a6f1a'
      ctx.font = '10px Courier New'
      ctx.fillText('SPACE / CLICK to jump · ESC to exit', W / 2 - 100, H - 10)

      state.frameId = requestAnimationFrame(gameLoop)
    }

    state.frameId = requestAnimationFrame(gameLoop)

    return () => {
      if (state.frameId) cancelAnimationFrame(state.frameId)
    }
  }, [])

  // Input handling
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault()
        jump()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [jump, onClose])

  const handleCanvasClick = () => jump()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.97)',
      }}
    >
      {/* Header */}
      <div style={{
        fontFamily: 'Courier New, monospace',
        color: '#33ff33',
        fontSize: '0.8rem',
        letterSpacing: '0.3em',
        marginBottom: '0.5rem',
        textTransform: 'uppercase',
      }}>
        ◄◄◄ OREGON TRAIL — PRAIRIE SCHOONER EDITION ►►►
      </div>

      {/* Canvas wrapper */}
      <div className="crt-scanlines" style={{ position: 'relative', border: '2px solid #1a4f1a', borderRadius: '4px', overflow: 'hidden' }}>
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          onClick={handleCanvasClick}
          style={{ display: 'block', cursor: 'pointer', maxWidth: '90vw' }}
        />

        {/* Random event popup */}
        <AnimatePresence>
          {event && (
            <motion.div
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              style={{
                position: 'absolute',
                top: '2.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(0,20,0,0.92)',
                border: '1px solid #33ff33',
                padding: '0.4rem 1rem',
                fontFamily: 'Courier New, monospace',
                color: '#ffff33',
                fontSize: '0.85rem',
                whiteSpace: 'nowrap',
                borderRadius: '2px',
                zIndex: 10,
              }}
            >
              ⚠ {event}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls hint */}
      <div style={{ fontFamily: 'Courier New, monospace', color: '#1a6f1a', fontSize: '0.72rem', marginTop: '0.5rem', letterSpacing: '0.1em' }}>
        SPACE / CLICK = JUMP &nbsp;·&nbsp; ESC = EXIT TO PITCH DECK
      </div>

      {/* Death screen */}
      <AnimatePresence>
        {dead && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.9)',
              flexDirection: 'column',
              gap: '1rem',
              fontFamily: 'Courier New, monospace',
              color: '#33ff33',
            }}
          >
            <div style={{ fontSize: '3rem' }}>⚰️</div>
            <div style={{ fontSize: '1.5rem', color: '#ff3333', letterSpacing: '0.2em' }}>GAME OVER</div>
            <div style={{ color: '#aaffaa' }}>YOU HAVE DIED ON THE TRAIL</div>
            <div style={{ color: '#ffff33', fontSize: '1.1rem' }}>FINAL SCORE: {score}</div>
            <div style={{ color: '#1a6f1a', fontSize: '0.8rem' }}>Miles traveled: {Math.floor(score * 0.8)}</div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <button
                onClick={() => { setDead(false); setScore(0); }}
                style={{
                  background: 'transparent', border: '1px solid #33ff33',
                  color: '#33ff33', padding: '0.4rem 1rem',
                  cursor: 'pointer', fontFamily: 'Courier New, monospace', fontSize: '0.85rem', borderRadius: '2px',
                }}
              >
                PLAY AGAIN
              </button>
              <button
                onClick={onClose}
                style={{
                  background: 'transparent', border: '1px solid #888',
                  color: '#888', padding: '0.4rem 1rem',
                  cursor: 'pointer', fontFamily: 'Courier New, monospace', fontSize: '0.85rem', borderRadius: '2px',
                }}
              >
                RETURN TO PITCH
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ESC button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: '1rem', right: '1rem',
          background: 'transparent', border: '1px solid #1a4f1a',
          color: '#1a8f1a', padding: '0.3rem 0.8rem',
          cursor: 'pointer', fontFamily: 'Courier New, monospace', fontSize: '0.75rem', borderRadius: '2px',
        }}
      >
        [ESC] EXIT
      </button>
    </motion.div>
  )
}
