const idRules = () => {
    return [
        param("/:id").isLength(24)
    ]
}



module.exports = { idRules}