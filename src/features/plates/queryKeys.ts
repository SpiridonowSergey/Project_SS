export function plateTemplatesQueryKey() {
  return ['plate-templates'] as const;
}

export function userPlateQueryKey(templateId: string | undefined) {
  return ['user-plate', templateId] as const;
}
