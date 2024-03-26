export function toCamelCase(str) {
    // 将字符串中的连字符(-)或下划线(_)替换为空格，并将每个单词的首字母大写
    return str.replace(/[-_](.)/g, (_, c) => c.toUpperCase());
}
