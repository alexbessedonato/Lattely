export function SiteLogo() {
  return (
    <a className="brand" href="#top" aria-label="Lattely homepage">
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 16H29V27C29 34 8 34 8 27V16Z"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <path
          d="M29 18H32C38 18 37 26 29 26M6 35H32M13 11C8 6 17 6 13 2M23 11C19 6 27 6 23 2"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span>
        Lattely<span className="brand-dot">.</span>
      </span>
    </a>
  );
}
