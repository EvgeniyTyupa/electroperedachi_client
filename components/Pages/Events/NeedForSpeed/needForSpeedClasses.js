import classes from './NeedForSpeed.module.css'

// Dynamic modifier names resolve to the same CSS Module as static classes.
export const cx = (...values) => values.filter(Boolean).join(' ').split(/\s+/).map(name => classes[name] || name).join(' ')
