'use strict'

var file2json = require('./file2json'),
    json2file = require('./json2file'),

    hasMajorMinorPatch = require('./hasMajorMinorPatch'),
    hasVersion         = require('./hasVersion'),
    CommandEnd         = require('./Command/End'),
    CommandFrom        = require('./Command/From'),
    getVersion         = require('./getVersion');

var versiony = (function(){

    var source,
        sourceJson,
        version2json = function(model, json){

            var value = model.get()

            if (hasMajorMinorPatch(json)){
                json.major = value[0]
                json.minor = value[1]
                json.patch = value[2]
            } else if (hasVersion(json)){
                json.version = value.join('.')
            }

            return json
        },

        logStrip = function(){
            console.log('---------------------------------------------')
        },

        indent = '    '

    return {
        model: require('./model')(),

        version: function(version){

            this.model.reset()
            this.model.set(getVersion(version))

            return this
        },

        indent: function(newIndent){
            indent = newIndent

            return this
        },

        newMajor: function(){
            this.major()
            this.minor(0)
            this.patch(0)

            return this
        },

        newMinor: function(){
            return this.minor().patch(0)
        },

        major: function(major){

            this.model.major.apply(this.model, arguments)

            return this
        },

        minor: function(minor){
            this.model.minor.apply(this.model, arguments)

            return this
        },

        patch: function(patch){
            this.model.patch.apply(this.model, arguments)

            return this
        },

        from: function(s){
            source = s || 'package.json';

            var commandFrom = new CommandFrom(source, file2json, getVersion, this);
            
            return commandFrom.execute();
        },

        'with': function(file){
            return this.from(file).to()
        },

        to: function(file){
            if (!file){
                file = source
            }

            if (file == source && String(this.model.get()) == this.initial ){
                //skip same file, no change detected
                return this
            }

            if (!file){
                return this
            }

            var json

            try {
                json = file2json(file)
            } catch (ex){
                console.log('\nNo file found at "'+ file + '". Skipping. \n')
                return this
            }

            try {
                if (!this.model.hasFile(file)){

                    this.model.file(file)

                    json2file(
                        file,
                        version2json(this.model, json),
                        indent
                    )
                }
            } catch (ex){
                console.log('\nCould not write version to "' + file + '". Skipping. \n')
            }

            return this
        },

        getVersion: function(){
            return this.model.get()
        },

        get: function(){
            return String(this.model.get())
        },

        end: function(){
            var end = new CommandEnd(logStrip, this);
            end.execute();

        }
    }
})()

module.exports = versiony