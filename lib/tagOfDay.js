const toggleTagOfDay = () => {
    var db = require('../db.js')
    const { Tag } = require('../models/tag.js')

    Tag.findOne({ isTagOfDay: true }, (err, tag) => {
        if (err) {
            return err
        }

        const setTagOfDay = () =>
            Tag.find((err, tags) => {
                const index = Math.floor(Math.random() * tags.length)
                const tagOfDay = tags[index]

                tagOfDay.isTagOfDay = true

                tagOfDay.save((err) => {
                    if (err) {
                        return err
                    }
                })
            })
        
        if (tag) {
            tag.isTagOfDay = false;

            tag.save((err) => {
                if (err) {
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
