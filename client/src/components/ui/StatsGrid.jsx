export const StatsGrid = ({
    stats,
    baseStats = null,
    onChange,
    disabled = false,
}) => {
    return (
        <div className="stats-grid">
            {Object.entries(stats).map(([stat, value]) => (
                <div key={stat} className="stat-input">
                    <label>
                        {stat}
                        {baseStats && ` (base ${baseStats[stat]})`}
                    </label>
                    <input
                        type="number"
                        value={value}
                        min={baseStats ? baseStats[stat] : 0}
                        disabled={disabled}
                        onChange={(e) => onChange(stat, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
};
