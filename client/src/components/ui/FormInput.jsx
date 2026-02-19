export const FormInput = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    min,
    disabled = false,
    options = [],
    rows = 3,
}) => {
    const handleChange = (e) => {
        onChange(e.target.value);
    };

    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}

            {type === "textarea" && (
                <textarea
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    rows={rows}
                    disabled={disabled}
                />
            )}

            {type === "select" && (
                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                >
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            )}

            {type !== "textarea" && type !== "select" && (
                <input
                    id={name}
                    type={type}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    min={min}
                    disabled={disabled}
                />
            )}
        </div>
    );
};
