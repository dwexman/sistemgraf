import NetworkCanvas from "./NetworkCanvas";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[#EFEEF5] min-h-[90vh] md:min-h-screen flex items-center"
    >
      <NetworkCanvas />

      <div className="absolute inset-0 z-10 overflow-hidden">
        <div
          aria-hidden="true"
          className="
            pointer-events-none select-none absolute
            -top-[28%] -left-[60%]
            w-[640px] h-[480px]
            md:-top-[30%] md:-left-[46%]
            md:w-[clamp(1200px,80vw,1800px)]
            md:h-[clamp(900px,62vw,1500px)]
            opacity-30 md:opacity-95
            transition-opacity
          "
        >
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="blobGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#005587" />
                <stop offset="100%" stopColor="#00A3E0" />
              </linearGradient>
            </defs>
            <path
              d="
                M 18,6 
                C 40,-6 72,3 88,18
                C 98,28 84,42 68,46
                C 58,48 60,62 70,74
                C 72,86 60,98 44,96
                C 28,94 16,86 10,74
                C 3,60 4,40 12,24
                C 16,16 20,10 18,6 Z
              "
              fill="url(#blobGradLeft)"
            />
          </svg>
        </div>

        <div
          aria-hidden="true"
          className="
            pointer-events-none select-none absolute
            -bottom-[10%] -right-[15%]
            w-[300px] h-[220px]
            md:-bottom-[18%] md:-right-[20%]
            md:w-[clamp(520px,44vw,980px)]
            md:h-[clamp(380px,34vw,760px)]
            bg-[linear-gradient(135deg,#005587,#00A3E0)]
            opacity-80 md:opacity-95
          "
          style={{
            clipPath:
              'path("M 60 220 C 120 120 300 60 520 80 C 650 92 770 150 820 240 C 860 312 830 410 760 480 C 690 552 560 600 420 620 C 280 638 150 600 90 520 C 40 454 20 330 60 220 Z")',
          }}
        />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <div className="w-full max-w-4xl text-center md:text-left md:ml-[5%] lg:ml-[8%] xl:ml-[10%]">
          <h1 className="font-bold tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white md:text-[#0A2F4F]">
            Impulsamos la{" "}
            <span className="bg-gradient-to-r from-[#A9D6FF] to-white md:from-[#005587] md:to-[#00A3E0] bg-clip-text text-transparent">
              transformación del capital humano
            </span>
          </h1>

          <p
            className="
              mt-5 md:mt-6 max-w-4xl
              text-white/90 md:text-[#0A2F4F]/90
              text-lg sm:text-xl md:text-2xl lg:text-[34px] xl:text-[38px]
              leading-tight md:leading-[1.15]
            "
          >
            A través de inteligencia de negocios, IA y análisis avanzado, potenciando el éxito
            organizacional en la era digital.
          </p>

          <div className="mt-8 md:mt-10 flex justify-center md:justify-start">
            <a
              href="#servicios"
              className="
                inline-flex items-center justify-center
                rounded-2xl px-7 py-3 md:px-8 md:py-4
                text-white text-base md:text-lg font-semibold text-center
                shadow-lg hover:opacity-95 active:scale-[.98] transition-all duration-300
                bg-gradient-to-r from-[#005587] to-[#00A3E0]
                hover:shadow-xl transform hover:-translate-y-1
                w-auto min-w-[180px]
              "
            >
              Saber más
              <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
