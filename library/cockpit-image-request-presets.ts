import { CockpitImageRequest, CockpitImageOptions } from "../models/cockpit-image"

export namespace CockpitImageRequestPreset {

	const defaultQuality = 75

	// Library

	export enum Format {

		Small = "small",
		Regular = "regular",
		Large = "large"
	
	}

	type PresetsByFormat = {[key: string]: CockpitImageRequest}

	// Preset Preparation

	const presets: PresetsByFormat = {}

	presets[Format.Small] = new CockpitImageRequest({
		mode: CockpitImageOptions.Mode.BestFit,
		width: 850,
		quality: defaultQuality
	})

	presets[Format.Regular] = new CockpitImageRequest({
		mode: CockpitImageOptions.Mode.BestFit,
		width: 1300,
		quality: defaultQuality
	})

	presets[Format.Large] = new CockpitImageRequest({
		mode: CockpitImageOptions.Mode.BestFit,
		width: 1800,
		quality: defaultQuality
	})

	// Preset Supply

	export function preset(format: Format): CockpitImageRequest {
		const preset = presets[format]
		
		if (!preset) {
			throw new TypeError(`Supplied format is not valid, can not return image request preset.`)
		}

		return preset
	}

}