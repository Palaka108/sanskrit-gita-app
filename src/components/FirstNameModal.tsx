import { useState } from 'react'
import { useAuth } from '../lib/AuthProvider'

export default function FirstNameModal() {
  const { needsFirstName, saveFirstName } = useAuth()
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)

  if (!needsFirstName) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    await saveFirstName(name)
    setSaving(false)
  }

  return (
    <div className="fname-overlay">
      <form className="fname-modal glass-card" onSubmit={handleSubmit}>
        <h2>Welcome!</h2>
        <p>What's your first name?</p>
        <input
          className="fname-input"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Your first name"
          autoFocus
          maxLength={50}
        />
        <button className="btn btn-primary" type="submit" disabled={!name.trim() || saving}>
          {saving ? 'Saving...' : 'Continue'}
        </button>
      </form>
    </div>
  )
}
