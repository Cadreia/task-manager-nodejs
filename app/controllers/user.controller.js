const db = require("../models");
const User = db.user;
const Role = db.role;

// for anyone
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

// for authenticated users only
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.allGroups = (req, res) => {
    res.status(200).send("User Content.");
};

exports.myGroups = (req, res) => {
    res.status(200).send("User Content.");
};

exports.invitations = (req, res) => {
    res.status(200).send("User Content.");
};

exports.requests = (req, res) => {
    res.status(200).send("User Content.");
};

// for admins only
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.allUsers = (req, res) => {
    User.find({}).populate("role").exec((err, users) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            let filtered = users.filter(user => user.role.name === 'user');
            res.status(200).send(filtered)
        }
    );
};

exports.allAdmins = (req, res) => {
    User.find({}).populate("role").exec((err, users) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            }
            let filtered = users.filter(user => user.role.name === 'admin');
            res.status(200).send(filtered)
        }
    );
};

// for moderators only
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
