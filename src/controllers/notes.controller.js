const notesController = {};

const Note = require('../models/note');
const { update } = require('../models/note');
const { query } = require('express');

notesController.renderNoteForm = (req, res) => {
    return res.render('notes/new-note')
};

notesController.createNewNote = (req, res ) => {

    let {title, description} = req.body;
    
    // Creating new Note 

   let noteDB =  new Note({
        title: title,
        description: description
    });
    noteDB.user = req.user.id;

    noteDB.save( (error, newNote) => {

        if(error) return req.flash('error_message', {error});

        // Send message using flash module (Middleware)
        req.flash('success_message', 'Note Added Successfully');
        // it's successfully
        return res.redirect('/notes');
    });
    
};

notesController.renderNotes = async (req, res) => {
     const notes = await Note.find({user: req.user.id}).sort({createdAt: 'desc'}).lean();
     res.render('notes/all-notes', {notes});
};

notesController.renderEditForm = async (req, res ) => {
    let id = req.params.id;
     let editNote = await Note.findById(id, (error, foundNote) => {

        if(error) return req.flash('error_message', {error});

        if(!foundNote){
            return req.flash('error_message', 'do not exist this note');
        }

        return foundNote;

    }).lean();

    if(editNote.user != req.user.id){
        req.flash('error_message', 'Not Authorized');
        return res.redirect('/notes');
    }
    
    return res.render('notes/edit-note',{editNote});
};

notesController.updateNote = (req, res ) => {
    
    let id = req.params.id;
    let body = req.body;

    let editNote = {
        title: body.title,
        description: body.description
    };


    Note.findByIdAndUpdate(id, editNote, {new:true, context:query} ,(error, updatedNote ) => {

        if(error) return req.flash('error_message', {error});

        if(!updatedNote){
            return req.flash('error_message', 'do not exist this note');
        }

        req.flash('success_message', 'Note updated Successfully');
        return res.redirect('/notes');

    });
}

notesController.deleteNote = (req, res) => {
    let id = req.params.id;
    Note.findByIdAndDelete(id, (error, deletedNote) => {

        if(error) return req.flash('error_message', {error});

        if(!deletedNote){
            return req.flash('error_message', 'do not exist this note');
        }

        req.flash('success_message', 'Note deleted Successfully');
//        console.log(deletedNote);
        return res.redirect('/notes');

        
    });
   
};

module.exports = notesController;