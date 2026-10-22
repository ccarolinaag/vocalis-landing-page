import { landingPageModel } from '../models/landingPageModel'

export function createLandingPageViewModel() {
  return {
    ...landingPageModel,
    navigation: landingPageModel.navigation.map((item) => ({
      ...item,
      href: `#${item.sectionId}`,
    })),
    modules: landingPageModel.modules.map((module, index) => ({
      ...module,
      number: String(index + 1).padStart(2, '0'),
    })),
    steps: landingPageModel.steps.map((step, index) => ({
      ...step,
      number: index + 1,
    })),
  }
}
