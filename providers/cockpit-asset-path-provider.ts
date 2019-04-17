import { Url, UrlComponent } from "../library/url"
import { CockpitImageRequestPreset } from "../library/cockpit-image-request-presets"
import { Configuration } from "../configuration/configuration"
import { QueryParameterProvider } from "./query-parameter-provider"

export namespace CockpitAssetPathProvider {

	const token = Configuration.Connections.cms.token()

	const pathPrefix = (() => {
		const connection = Configuration.Connections.cms
		return `${connection.protocol(Configuration.Context.Client)}://${connection.host(Configuration.Context.Client)}`
	})()

	export function cockpitAsset(component: UrlComponent): Url {
		return `${pathPrefix}${component}`
	}

	export function cockpitImage(component: UrlComponent, format?: CockpitImageRequestPreset.Format|undefined): Url {
		const sourcePath = component

		const imageRequest = CockpitImageRequestPreset.preset(format || CockpitImageRequestPreset.Format.Regular)
		const imageRequestOptions = imageRequest.options(sourcePath) as QueryParameterProvider.ParameterDictionary

		const joinedImageRequestOptions = QueryParameterProvider.joinedParameters(imageRequestOptions)
		const imageUrl: Url = `${pathPrefix}/api/cockpit/image?token=${token}&${joinedImageRequestOptions}`

		return imageUrl
	}

}