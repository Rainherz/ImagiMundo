

// Taxonomías de ejemplo (4 items)
export const sample_types: ActorTaxonomy[] = [
	{ id: 'role', value: 'Role' },
	{ id: 'org', value: 'Organization' },
	{ id: 'skill', value: 'Skill' },
	{ id: 'system', value: 'System' },
	{ id: 'contractor', value: 'Contractor' },
	{ id: 'executive', value: 'Executive' },
	{ id: 'infra', value: 'Infrastructure' },
	{ id: 'org-backend', value: 'Org (Backend)' },
	{ id: 'role-compliance', value: 'Compliance Role' },
]

// Datos de ejemplo (~20 items). Mezclamos objetos completos con strings y
// relaciones de `parents` tanto por id (string) como por objetos ligeros.
const sample_data: ActorType[] = [
	{ id: 'a1', name: 'Admin', type: sample_types[0], parents: [] },
	{ id: 'a2', name: 'Super Admin', type: sample_types[0], parents: ['a1'] },
	{ id: 'a3', name: 'Finance Dept', type: sample_types[1], parents: [] },
	{ id: 'a4', name: 'HR Dept', type: sample_types[1], parents: ['a3'] },
	{ id: 'a5', name: 'Backend Team', type: sample_types[7], parents: ['a3'] },
	{ id: 'a6', name: 'Frontend Team', type: sample_types[1], parents: ['a3'] },
	{ id: 'a7', name: 'React', type: sample_types[2], parents: [] },
	{ id: 'a8', name: 'Node.js', type: sample_types[2], parents: ['a7'] },
	{ id: 'a9', name: 'CI System', type: sample_types[3], parents: [] },
	{ id: 'a10', name: 'Monitoring', type: sample_types[3], parents: ['a9'] },
	{ id: 'a11', name: 'External Contractor', type: sample_types[4], parents: [] },
	{ id: 'a12', name: 'Intern', type: sample_types[0], parents: ['a1'] },
	{ id: 'a13', name: 'Product Owner', type: sample_types[0], parents: ['a1'] },
	{ id: 'a14', name: 'Legal Dept', type: sample_types[1], parents: [] },
	{ id: 'a15', name: 'Compliance', type: sample_types[8], parents: ['a14'] },
	{ id: 'a16', name: 'Data Team', type: sample_types[1], parents: ['a3'] },
	{ id: 'a17', name: 'ML Engineer', type: sample_types[2], parents: ['a7','a8'] },
	{ id: 'a18', name: 'DevOps Engineer', type: sample_types[2], parents: ['a2','a9'] },
	{ id: 'a19', name: 'Guest', type: sample_types[0], parents: [] },
	{ id: 'a20', name: 'Board', type: sample_types[1], parents: [] },
]

// 15 actores adicionales (miembros de equipo y empresa ficticia)
sample_data.push(
	{ id: 'a21', name: 'CTO', type: sample_types[5], parents: ['a20'] },
	{ id: 'a22', name: 'CEO', type: sample_types[5], parents: ['a20'] },
	{ id: 'a23', name: 'CFO', type: sample_types[5], parents: ['a20'] },
	{ id: 'a24', name: 'HR Manager', type: sample_types[0], parents: ['a14'] },
	{ id: 'a25', name: 'QA Engineer', type: sample_types[2], parents: ['a7','a8'] },
	{ id: 'a26', name: 'UX Designer', type: sample_types[2], parents: ['a7'] },
	{ id: 'a27', name: 'Site Reliability', type: sample_types[6], parents: ['a9'] },
	{ id: 'a28', name: 'Cloud Provider', type: sample_types[6], parents: [] },
	{ id: 'a29', name: 'Contractor - Mobile', type: sample_types[4], parents: ['a3'] },
	{ id: 'a30', name: 'Tech Lead', type: sample_types[0], parents: ['a2'] },
	{ id: 'a31', name: 'Senior Backend', type: sample_types[2], parents: ['a5'] },
	{ id: 'a32', name: 'Junior Frontend', type: sample_types[2], parents: ['a6'] },
	{ id: 'a33', name: 'Security', type: sample_types[6], parents: ['a9','a10'] },
	{ id: 'a34', name: 'Business Analyst', type: sample_types[0], parents: ['a13'] },
	{ id: 'a35', name: 'Office Admin', type: sample_types[1], parents: ['a14'] },
)

export default sample_data
export { sample_types as types }
