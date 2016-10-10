function requireAll(requireContext) {
	return requireContext.keys().map(requireContext);
}

var modules = requireAll(require.context("./test", true, /.+\.jsx?$|\.js?$/));
//var modules = requireAll(require.context("./test", true, /.+\.js?$/));

module.exports = modules
