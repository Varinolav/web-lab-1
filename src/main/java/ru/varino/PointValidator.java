package ru.varino;

import java.math.BigDecimal;
import java.util.HashMap;

public class PointValidator {
    private final HashMap<String, String> values;
    private float x;
    private BigDecimal y;
    private float r;

    public PointValidator(HashMap<String, String> values) {
        this.values = values;
    }

    public boolean validate() {
        try {
            x = Float.parseFloat(values.get("x"));
            y = BigDecimal.valueOf(Double.parseDouble(values.get("y")));
            r = Float.parseFloat(values.get("r"));
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public boolean isHit() {
        return firstQuarter() || thirdQuarter() || fourthQuarter();
    }

    private boolean firstQuarter() {
        if (x >= 0 && y.compareTo(BigDecimal.ZERO) >= 0) {
            return BigDecimal.valueOf(x).pow(2).add(y.pow(2)).compareTo(BigDecimal.valueOf(r).pow(2)) <= 0;
        }
        return false;
    }

    private boolean thirdQuarter() {
        if (x <= 0 && y.compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.valueOf(x).add(y).abs().compareTo(BigDecimal.valueOf(r).abs()) <= 0;
        }
        return false;
    }

    private boolean fourthQuarter() {
        if (x >= 0 && y.compareTo(BigDecimal.ZERO) <= 0) {
            return x < r && y.compareTo(BigDecimal.valueOf(-r)) > 0;
        }
        return false;
    }


}
