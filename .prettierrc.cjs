module.exports = {
  plugins: [require.resolve("@trivago/prettier-plugin-sort-imports")],
  importOrder: [
    "^react",
    "^react-native",
    "<THIRD_PARTY_MODULES>",
    "^@\\/",
    "^\\.\\/",
  ],
  importOrderSeparation: true,
};
