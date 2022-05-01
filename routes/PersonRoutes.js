const router = require('express').Router()
const Person = require('../models/Person')

//CREATE PERSON
router.post('/', async (req, res) => {
    const {name, email, salary, approved} = req.body

    const newPerson = {name, email, salary, approved}

    try {
        
        await Person.create(newPerson)

        res.status(201).json({ message: 'Pessoa criada com sucesso' })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// GET ALL PERSONS
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()

        res.status(200).json(people)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//GET PERSON BY ID
router.get('/:id', async (req, res) => {
    const id = req.params.id

    try {
        const person = await Person.findOne({ _id: id })

        if (!person) {
            res.status(422).json({message: 'Usuário inexistente'})
            return  
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

// PATCH PERSON
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {name, email, salary, approved} = req.body
    const person = {name, email, salary, approved}
    try {
        
        const updatedPerson = await Person.updateOne({_id:id}, person)

        if (updatedPerson.matchedCount === 0) {
            res.status(422).json({message: 'Usuário inexistente'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error: error})
    }
})

// DELETE PERSON
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if (!person) {
        res.status(422).json({message: 'Usuário inexistente'})
        return  
    }
    
    try {
        await Person.deleteOne({_id:id})
        res.status(200).json({message: 'Usuário removido com sucesso',
    person})

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router