// Original vector illustrations for the throwaway homepage; no external assets.
export function CoffeeArtPrototype({ motif = "cup", hero = false }: { motif?: "cup" | "pot" | "glass"; hero?: boolean }) {
  return <svg viewBox="0 0 480 340" fill="none" aria-hidden="true" className={hero ? "coffee-art hero-art" : "coffee-art"}>
    <circle cx="242" cy="171" r="133" fill="currentColor" opacity=".08" />
    <path d="M63 268C125 240 354 240 417 268M99 285C166 264 319 264 378 285" stroke="currentColor" strokeWidth="2" opacity=".25" />
    <g stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
      {motif === "cup" && <>
        <ellipse cx="229" cy="251" rx="113" ry="20" fill="var(--art-paper)" />
        <path d="M311 139C378 118 377 205 311 206" strokeWidth="13" />
        <path d="M141 134H313L302 207C297 249 157 249 151 207L141 134Z" fill="var(--art-paper)" />
        <ellipse cx="227" cy="134" rx="86" ry="28" fill="var(--coffee)" />
        <path d="M196 130C213 105 255 109 263 132C263 144 244 148 229 155C216 148 195 143 196 130Z" fill="var(--art-paper)" strokeWidth="2" />
        <path d="M202 126Q227 132 251 125M209 137Q228 142 247 136M219 145L230 151" stroke="var(--coffee)" strokeWidth="2" />
        <path d="M199 77C178 58 213 52 198 28M236 77C220 59 252 49 237 28M274 77C258 59 287 51 275 32" opacity=".5" />
      </>}
      {motif === "pot" && <>
        <path d="M221 62H266L274 88H212L221 62Z" fill="var(--art-paper)" />
        <path d="M182 90H299L320 169L285 185H198L165 167L182 90Z" fill="var(--art-paper)" />
        <path d="M203 183H280L303 256H180L203 183Z" fill="var(--coffee)" />
        <path d="M300 103H344V160H318" strokeWidth="9" />
        <path d="M181 102L148 113L170 135M221 96L213 166M259 96L268 166M225 193L213 248M262 193L270 248" />
        <path d="M183 270H302M214 44C202 29 226 26 217 10" opacity=".5" />
      </>}
      {motif === "glass" && <>
        <path d="M155 94H310L289 254H177L155 94Z" fill="var(--art-paper)" />
        <path d="M165 160H300L289 249H178L165 160Z" fill="var(--coffee)" />
        <ellipse cx="232" cy="160" rx="67" ry="13" fill="var(--art-paper)" />
        <path d="M259 27L244 188" strokeWidth="7" />
        <path d="M182 126L203 106L220 127L201 148Z M238 127L260 109L281 131L258 148Z" />
        <path d="M180 265H291M193 188L199 228M215 187L219 233M241 185V234M265 186L261 230" opacity=".6" />
      </>}
    </g>
    <path d="M86 123L91 136L104 141L91 146L86 159L81 146L68 141L81 136Z M377 201L381 211L391 215L381 219L377 229L373 219L363 215L373 211Z" fill="currentColor" />
    {hero && <><path d="M352 67Q405 42 409 86Q369 105 352 67Z" fill="currentColor" opacity=".18" /><path d="M362 72L397 66" stroke="currentColor" strokeWidth="2" /><text x="43" y="73" fill="currentColor" fontSize="12" letterSpacing="3" transform="rotate(-12 43 73)">BREWED WITH CURIOSITY</text></>}
  </svg>;
}
