import { ComponentProps, memo } from 'react'
import { VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/shared/utils'

const groupVariants = cva('relative', {
  variants: {
    variant: {
      outline:
        'w-full border border-gray-300 bg-inherit transition-[color,outline] duration-200 dark:focus-within:border-white dark:focus-within:outline-white/90 focus-within:outline-black/90 dark:hover:border-white dark:hover:outline-white hover:outline-black hover:outline focus-within:outline'
    },
    size: {
      default: 'rounded-primary'
    }
  },
  defaultVariants: {
    variant: 'outline',
    size: 'default'
  }
})

const inputVariants = cva('w-full peer', {
  variants: {
    variant: {
      outline:
        'bg-inherit outline-none text-black placeholder:opacity-0 focus-within:placeholder:opacity-100 overflow-hidden'
    },
    size: {
      default: 'px-3 py-2 text-base rounded-primary'
    }
  },
  defaultVariants: {
    variant: 'outline',
    size: 'default'
  }
})

const labelVariants = cva(
  'absolute top-1/2 left-2 -translate-y-1/2 cursor-text bg-background text-base font-medium text-gray-500 transition-[top,font-size] duration-200',
  {
    variants: {
      variant: {
        outline: 'peer-focus-within:top-0 peer-focus-within:text-black peer-not-placeholder-shown:top-0'
      },
      size: {
        default: 'px-2 peer-focus-within:text-xs peer-not-placeholder-shown:text-xs'
      }
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default'
    }
  }
)

interface InputProps extends VariantProps<typeof groupVariants> {
  label?: string
  error?: string
  classNameGroup?: string
  classNameLabel?: string
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
    classNameGroup,
    classNameLabel,
    variant,
    size,
    ...rest
  }: ComponentProps<'input'> & InputProps) => {
    return (
      <div className="group-[input]">
        <div
          className={cn(
            groupVariants({ variant, size }),
            error && 'border-red-500 focus-within:border-red-500 hover:border-red-500',
            classNameGroup
          )}>
          <input
            id={name}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className={cn(inputVariants({ variant, size }), className, !label && 'placeholder:opacity-100')}
            {...rest}
          />
          {label && (
            <label
              htmlFor={name}
              className={cn(
                labelVariants({ variant, size }),
                error && 'font-semibold text-red-500 peer-focus-within:text-red-500',
                classNameLabel
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
