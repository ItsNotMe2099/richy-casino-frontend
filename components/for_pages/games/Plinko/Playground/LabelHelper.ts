export default class LabelHelper {
  static createPlinkoLabel(id: number) {
    return `plinko-${id}`
  }

  static createPegLabel(id: number) {
    return `peg-${id}`
  }

  static createFakeBucketLabel(id: number) {
    return `bucket-fake-${id}`
  }

  static createRealBucketLabel(id: number) {
    return `bucket-real-${id}`
  }

  static isPlinko(label: string) {
    return label.includes('plinko')
  }

  static isPeg(label: string) {
    return label.includes('peg')
  }

  static isBucket(label: string) {
    return label.includes('bucket')
  }

  static getId(label: string): number {
    const arr = label.split('-')
    if (arr.length > 0 && !Number.isNaN(Number.parseInt(arr[arr.length - 1]))) {
      return Number.parseInt(arr[arr.length - 1])
    }
    return -1
  }
}
