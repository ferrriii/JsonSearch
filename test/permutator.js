// https://www.geeksforgeeks.org/print-all-the-permutation-of-length-l-using-the-elements-of-an-array-iterative/
function convertToLenTheBase (n, arr, len, L, callBack) {
  const a = []
  // Sequence is of length L
  for (let i = 0; i < L; i++) {
    // Print the ith element
    // of sequence
    a.push(arr[n % len])
    n = parseInt(n / len)
  }
  return callBack(a)
}

export default function permutate (arr, minLen, maxLen, callBack) {
  for (let L = minLen; L <= maxLen; L++) {
    const len = arr.length
    for (let i = 0; i < parseInt(Math.pow(len, L)); i++) {
      // Convert i to len th base
      const callBackReturn = convertToLenTheBase(i, arr, len, L, callBack)
      if (callBackReturn === false) return false
    }
  }
  return true
}
