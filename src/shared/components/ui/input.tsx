import { ComponentProps, memo } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/shared/utils'
import { ClassValue } from 'clsx'

const groupVariants = cva('relative', {
  variants: {
    variant: {
      outline: 'w-full border bg-inherit transition-[color,outline] duration-200 hover:outline focus-within:outline'
    },
    size: {
      default: 'rounded-primary'
    },
    color: {
      default:
        'border-gray-300 dark:focus-within:border-white dark:focus-within:outline-white/90 focus-within:outline-black/90 dark:hover:border-white dark:hover:outline-white hover:outline-black',
      error:
        'border-red-400 focus-within:border-red-400 hover:border-red-400 dark:focus-within:border-red-400/90 focus-within:outline-red-400/90 dark:hover:outline-red-400 hover:outline-red-400'
    }
  },
  defaultVariants: {
    variant: 'outline',
    size: 'default',
    color: 'default'
  }
})

const inputVariants = cva('w-full peer', {
  variants: {
    variant: {
      outline: 'bg-inherit outline-none placeholder:opacity-0 focus-within:placeholder:opacity-100 overflow-hidden'
    },
    size: {
      default: 'px-3 py-2 text-base rounded-primary'
    },
    color: {
      default: 'text-black',
      error: ''
    }
  },
  defaultVariants: {
    variant: 'outline',
    size: 'default',
    color: 'default'
  }
})

const labelVariants = cva(
  'absolute top-1/2 left-2 -translate-y-1/2 cursor-text  text-base font-medium  transition-[top,font-size] duration-200',
  {
    variants: {
      variant: {
        outline: 'peer-focus-within:top-0 peer-focus-within:text-black peer-not-placeholder-shown:top-0'
      },
      size: {
        default: 'px-2 peer-focus-within:text-xs peer-not-placeholder-shown:text-xs'
      },
      color: {
        default: 'bg-background text-gray-500',
        error: 'bg-background text-red-400 peer-focus-within:text-red-400'
      }
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
      color: 'default'
    }
  }
)

interface InputProps extends VariantProps<typeof groupVariants> {
  label?: string
  error?: string
  classNameInput?: ClassValue
  classNameLabel?: ClassValue
}

export const Input = memo(
  ({
    label,
    name,
    value,
    placeholder = '',
    className,
    onChange,
    error,
    classNameInput,
    classNameLabel,
    variant,
    size,
    color,
    ...rest
  }: ComponentProps<'input'> & InputProps) => {
    return (
      <div className="group-[input]">
        <div className={cn(groupVariants({ variant, size, className, color: error ? 'error' : color }))}>
          <input
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={cn(
              inputVariants({ variant, size, className: classNameInput, color: error ? 'error' : color }),
              !label && 'placeholder:opacity-100'
            )}
            {...rest}
          />
          {label && (
            <label
              htmlFor={name}
              className={cn(
                labelVariants({ variant, size, className: classNameLabel, color: error ? 'error' : color })
              )}>
              {label}
            </label>
          )}
        </div>

        {error && <span className="mt-1 block pl-1 text-xs text-red-500">{error}</span>}
      </div>
    )
  }
)
