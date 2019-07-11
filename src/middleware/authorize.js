export default (...roles) => {
  const isAllowed = role => roles.indexOf(role) > -1;
  return (req, res, next) => {
    if (req.user && isAllowed(req.user.role)) {
      return next();
    }
    return res.status(404).json({
      error: 'Access is denied',
      message:
        'You may not have the appropriate permissions to perform this action'
    });
  };
};
