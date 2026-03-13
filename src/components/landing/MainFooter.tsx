export default function MainFooter() {
  return (
    <footer className="bg-[#000000] text-white pt-16 pb-20 md:pt-16 md:pb-20 border-t-0 max-md:py-10 max-md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12 pb-6 md:pb-10 border-b border-white/20">
          <div className="flex flex-col gap-6">
            <div className="font-body font-semibold text-base md:text-lg tracking-wide">Auiki srl</div>
          </div>
          <div className="flex flex-col md:items-end gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-16 w-full max-w-full justify-items-start">
              <div>
                <h5 className="text-[11px] md:text-xs font-bold uppercase tracking-wider mb-2.5 md:mb-4 text-white/90 text-left md:text-right">Contatti</h5>
                <ul className="list-none">
                  <li className="mb-1.5 md:mb-2 text-left md:text-right"><a href="tel:" className="text-white/75 text-[13px] md:text-sm no-underline hover:text-white transition-colors">Telefono</a></li>
                  <li className="mb-1.5 md:mb-2 text-left md:text-right"><a href="mailto:" className="text-white/75 text-[13px] md:text-sm no-underline hover:text-white transition-colors">Email</a></li>
                </ul>
              </div>
              <div>
                <h5 className="text-[11px] md:text-xs font-bold uppercase tracking-wider mb-2.5 md:mb-4 text-white/90 text-left md:text-right">Dove trovarci</h5>
                <ul className="list-none">
                  <li className="mb-1.5 md:mb-2 text-left md:text-right text-white/75 text-[13px] md:text-sm">Reggio Emilia</li>
                  <li className="mb-1.5 md:mb-2 text-left md:text-right text-white/75 text-[13px] md:text-sm">Milano</li>
                </ul>
              </div>
              <div>
                <h5 className="text-[11px] md:text-xs font-bold uppercase tracking-wider mb-2.5 md:mb-4 text-white/90 text-left md:text-right">Social</h5>
                <ul className="list-none">
                  <li className="mb-1.5 md:mb-2 text-left md:text-right"><a href="#" target="_blank" rel="noopener noreferrer" className="text-white/75 text-[13px] md:text-sm no-underline hover:text-white transition-colors">Instagram</a></li>
                  <li className="mb-1.5 md:mb-2 text-left md:text-right"><a href="#" target="_blank" rel="noopener noreferrer" className="text-white/75 text-[13px] md:text-sm no-underline hover:text-white transition-colors">Linkedin</a></li>
                  <li className="mb-1.5 md:mb-2 text-left md:text-right"><a href="#" target="_blank" rel="noopener noreferrer" className="text-white/75 text-[13px] md:text-sm no-underline hover:text-white transition-colors">Vimeo</a></li>
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap md:justify-end gap-4 md:gap-6 mt-4 md:mt-6 text-xs md:text-sm text-white/60">
              <span>REA 307388</span>
              <span>p.iva 02721330351</span>
            </div>
          </div>
        </div>
        <div className="pt-7 md:pt-12 text-center">
          <img src="/auiki-logo-footer.png" alt="AUIKI" className="max-w-[160px] md:max-w-full h-auto block mx-auto object-contain" />
        </div>
      </div>
    </footer>
  );
}
