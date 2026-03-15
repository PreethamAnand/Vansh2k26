'use client';


interface CurvedLoopProps {
  marqueeText?: string;
  /** Higher = faster. Translates to CSS animation duration as 50/speed seconds. */
  speed?: number;
  className?: string;
  wrapperClassName?: string;
  /** Unused — kept for API compatibility */
  curveAmount?: number;
  direction?: 'left' | 'right';
  /** Unused — kept for API compatibility */
  interactive?: boolean;
}

const CurvedLoop = ({
  marqueeText = '',
  speed = 2,
  className = '',
  wrapperClassName = '',
  direction = 'left',
}: CurvedLoopProps) => {
  return (
    <div className={`curved-loop-jacket${wrapperClassName ? ` ${wrapperClassName}` : ''}`}>
      <div
        className={`curved-loop-track${direction === 'right' ? ' curved-loop-track--right' : ''}`}
        data-speed={String(Math.min(5, Math.max(1, Math.round(speed))))}      >
        {/* Two identical copies — CSS animates by -50% of combined width for seamless loop */}
        <span className={`curved-loop-text${className ? ` ${className}` : ''}`} aria-hidden="true">
          {marqueeText}
        </span>
        <span className={`curved-loop-text${className ? ` ${className}` : ''}`}>
          {marqueeText}
        </span>
      </div>
    </div>
  );
};

export default CurvedLoop;
