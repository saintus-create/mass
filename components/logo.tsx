

export const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-foreground"
      >
        <path d="M7 5.5C7 4.67 7.67 4 8.5 4H12C15.31 4 18 6.69 18 10C18 13.31 15.31 16 12 16H9V20H7V5.5ZM9 14H12C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6H9V14Z" />
      </svg>
      <span className="text-lg font-semibold">Spectrum</span>
    </div>
  )
}
