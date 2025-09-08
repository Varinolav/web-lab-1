package ru.varino;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashMap;

public class PointValidator {
    private final HashMap<String, String> values;
    private BigDecimal x;
    private BigDecimal y;
    private BigDecimal r;

    public PointValidator(HashMap<String, String> values) {
        this.values = values;
    }

    public boolean validate() {
        try {
            x = BigDecimal.valueOf(Float.parseFloat(values.get("x")));
            y = BigDecimal.valueOf(Double.parseDouble(values.get("y")));
            r = BigDecimal.valueOf(Float.parseFloat(values.get("r")));
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public boolean isHit() {
        return firstQuarter() || thirdQuarter() || fourthQuarter();
    }

    private boolean firstQuarter() {
        if (x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) >= 0) {
            return x.pow(2).add(y.pow(2)).compareTo(r.pow(2)) <= 0;
        }
        return false;
    }

    private boolean thirdQuarter() {
        if (x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) <= 0) {
            return x.add(y).abs().compareTo(r.divide(BigDecimal.valueOf(2), RoundingMode.HALF_UP).abs()) <= 0;
        }
        return false;
    }

    private boolean fourthQuarter() {
        if (x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) <= 0) {
            return x.compareTo(r) <= 0 && y.compareTo(r.negate()) >= 0;
        }
        return false;
    }


}
