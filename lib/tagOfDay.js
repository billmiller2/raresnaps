const toggleTagOfDay = () => {
    var db = require('../db.js')
    db.connect()

    const { Tag } = require('../models/tag.js')

    const closeDbConnection = () => db.getDb().close()

    Tag.findOne({ isTagOfDay: true }, (err, tag) => {
        if (err) {
            closeDbConnection()
            return err
        }

        const setTagOfDay = () =>
            Tag.find((err, tags) => {
                const index = Math.floor(Math.random() * tags.length)
                const tagOfDay = tags[index]

                tagOfDay.isTagOfDay = true

                tagOfDay.save((err) => {
                    if (err) {
                        closeDbConnection()
                        return err
                    }
                    closeDbConnection()
                })
            })
        
        if (tag) {
            tag.isTagOfDay = false;

            tag.save((err) => {
                if (err) {
                    closeDbConnection()
                    return err
                }

                setTagOfDay()

            })
        } else {
            setTagOfDay()
        }
    })
}

module.exports = { toggleTagOfDay }
