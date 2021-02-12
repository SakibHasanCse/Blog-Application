exports.smartTrim = (str, length, delim, appendix) => {
    if (str.length <= length) return str;

    var trimmedStr = str.substr(0, length + delim.length)

    var lastDelimeIndex = trimmedStr.lastIndexOf(delim)

    if (lastDelimeIndex >= 0) trimmedStr = trimmedStr.substr(0, lastDelimeIndex)

    if (trimmedStr) trimmedStr += appendix
    return trimmedStr

}