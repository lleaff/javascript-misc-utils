export default function stripExtension(str) {
    const dotIndex = str.lastIndexOf('.');
    return !dotIndex ? str : str.substring(0, dotIndex);
}