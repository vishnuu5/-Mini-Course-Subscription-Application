export const PromoInput = ({ promoCode, setPromoCode, onApply }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-text-primary ml-1">
        Promo Code
      </label>
      <div className="flex gap-3">
        <input
          type="text"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
          placeholder="Enter promo code (BFSALE25)"
          className="flex-1 min-w-0 px-4 py-3 border border-border rounded-xl bg-bg-secondary text-text-primary focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all duration-300 placeholder:text-text-tertiary shadow-sm"
        />
        <button
          onClick={onApply}
          disabled={!promoCode}
          className="bg-bg-tertiary hover:bg-border disabled:opacity-50 disabled:cursor-not-allowed text-text-primary px-6 py-3 rounded-xl font-semibold transition-all duration-300 border border-border hover:shadow-sm active:scale-95 whitespace-nowrap"
        >
          Apply
        </button>
      </div>
      <div className="flex items-center gap-2 px-1">
        <span className="text-lg animate-pulse">💡</span>
        <p className="text-xs text-text-secondary">
          Tip: Try{" "}
          <span
            className="font-mono bg-green-100 text-green-700 px-1.5 py-0.5 rounded border border-green-200 font-bold select-all cursor-pointer"
            onClick={() => setPromoCode("BFSALE25")}
          >
            BFSALE25
          </span>{" "}
          for 50% discount
        </p>
      </div>
    </div>
  );
};

export default PromoInput;
