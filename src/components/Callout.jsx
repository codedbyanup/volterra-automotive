// A dot on the photograph, a leader line, and a label. The parent decides when it
// appears (scroll scene: scrubbed, design section: once on enter) via data attributes.
const LINE = {
  right: { wrap: 'left-0 top-0', line: 'callout-line-x', style: (len) => ({ width: len }) },
  left: { wrap: 'right-0 top-0', line: 'callout-line-x', style: (len) => ({ width: len }) },
  up: { wrap: 'bottom-0 left-0', line: 'callout-line-y', style: (len) => ({ height: len }) },
  down: { wrap: 'top-0 left-0', line: 'callout-line-y', style: (len) => ({ height: len }) },
}

function labelPosition(dir, len) {
  const gap = 8
  switch (dir) {
    case 'right': return { left: len + gap, top: 0, transform: 'translateY(-50%)' }
    case 'left': return { right: len + gap, top: 0, transform: 'translateY(-50%)', textAlign: 'right' }
    case 'up': return { left: 0, bottom: len + gap }
    default: return { left: 0, top: len + gap }
  }
}

export default function Callout({ at, dir, len, title, text, size = 'scene', ...rest }) {
  const cfg = LINE[dir]
  const titleCls = size === 'scene' ? 'text-[10.5px]' : 'text-[0.9375rem]'
  const textCls = size === 'scene' ? 'text-[9.5px]' : 'text-[0.8125rem]'
  const width = size === 'scene' ? 'w-[9.5rem]' : 'w-[12rem]'

  return (
    <div
      data-callout
      {...rest}
      className="pointer-events-none absolute z-10 h-0 w-0"
      style={{ left: `${at[0] * 100}%`, top: `${at[1] * 100}%` }}
    >
      <span
        data-dot
        className="absolute -left-[5px] -top-[5px] block h-[10px] w-[10px] rounded-full border border-lime bg-lime/25"
      >
        <span className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime" />
      </span>
      <span className={`absolute ${cfg.wrap}`}>
        <span
          data-line
          data-dir={dir}
          className={`block bg-ivory/70 ${cfg.line}`}
          style={cfg.style(len)}
        />
      </span>
      <div className={`absolute ${width}`} style={labelPosition(dir, len)}>
        <div data-label>
          <p className={`font-semibold leading-tight text-ivory ${titleCls}`}>{title}</p>
          <p className={`mt-0.5 leading-snug text-ivory-dim ${textCls}`}>{text}</p>
        </div>
      </div>
    </div>
  )
}
