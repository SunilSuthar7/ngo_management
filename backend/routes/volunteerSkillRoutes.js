const express = require('express');
const router = express.Router();
const volunteerSkillController = require('../controllers/volunteerSkillController');

router.get('/:volunteerID', volunteerSkillController.getSkillsByVolunteer);
router.post('/add', volunteerSkillController.addVolunteerSkills); // 🔥 Updated to handle multiple skills
router.delete('/remove', volunteerSkillController.removeVolunteerSkill);

module.exports = router;
