import { describe, it, expect, vi } from 'vitest'
import { logger } from './index.js'

describe('logger', () => {
  it('calls console.log for info level', () => {
    const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
    logger.info('test message', { key: 'value' })
    expect(spy).toHaveBeenCalled()
    const output = spy.mock.calls[0].join(' ')
    expect(output).toContain('[INFO]')
    spy.mockRestore()
  })

  it('calls console.error for error level', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    logger.error('something broke')
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})
