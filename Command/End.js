export default class End {

	constructor(logStrip, versiony) {
		this.logStrip = logStrip;
		this.versiony = versiony;
	}

	execute() {

		this.logStrip();

		var files   = this.versiony.model.files().slice(),
		    version = String(this.versiony.model.get());

		if (files.length) {

		    console.log('Done. New version: ' + version);

		    this.logStrip();

		    console.log('Files updated:\n');

		    files.forEach(function(f){
		        console.log(f);
		    })


		} else {
		    console.log('No file updated.');
		}

		this.logStrip();

		this.versiony.model.reset();

		return {
		    version: version,
		    files  : files
		};
	}
}