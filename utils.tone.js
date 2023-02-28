
class Granulator {
	// Crear desde el ultimo al primero
	// Synth->filter->panner->gain->salida
	constructor(n = 10) {
		this.num = n;
		this.gainN = new Tone.Gain(0);
		// Paneo
		this.pannerN = new Tone.Panner(0).connect(this.gainN);
		// Filtro
		this.filterN = new Tone.Filter({
			type: "highpass",
			Q: 5,
			frequency: 500,
		}).connect(this.pannerN);
		// Synths
		this.synths = [];
		for (let i = 0; i < this.num; i++) {
			this.synths.push(
				new Tone.Synth({
					oscillator: {
						type: "sine",
					},
					envelope: {
						attack: 1,
						decay: 1,
						sustain: 1,
						release: 1,
					},
				}).connect(this.filterN),
			);
		}
		return this;
	}
	gain(g = 0) {
		this.gainN.gain.value = g;
		return this.gainN;
	}
	update() {
		this.synths.forEach((s) => {
			s.frequency.value = random(0.1, 30);
			s.volume.value = random(-20, -6);
			this.pannerN.pan.value = random(-1, 1);
			this.filterN.frequency.value = random(500, 15000);
			this.filterN.Q.value = 20;
		});
	}
	triggerAttack() {
		this.synths.forEach((s) => {
			s.triggerAttack();
		});
	}
	triggerRelease() {
		this.synths.forEach((s) => {
			s.triggerRelease();
		});
	}
}