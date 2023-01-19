const { renderAdminLogin, loginAdmin, renderAdminDashboard } = require('../controllers/admin');
const { verifyAdminToken } = require('../middleware/generateAndVerifyToken')

const router = require('express').Router();

// /auth/admin


router.get('/login', renderAdminLogin)

router.post('/login', loginAdmin)

router.get('/dashboard', verifyAdminToken, renderAdminDashboard)



module.exports = router;