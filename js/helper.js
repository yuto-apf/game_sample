function mod(a, b) {
    return a % b + ((a * b < 0) ? b : 0);
}