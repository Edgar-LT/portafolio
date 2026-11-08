import assert from "node:assert";

class ProjectIndex {
  constructor(projects) {
    this.raw = Object.freeze([...(projects || [])]);
    this.published = this.raw.filter((p) => p.published !== false);
    this.byId = new Map();
    this.byCategory = new Map();

    for (const project of this.published) {
      this.byId.set(project.id, project);
      const categories = Array.isArray(project.categories) ? project.categories : [];
      for (const cat of categories) {
        if (!this.byCategory.has(cat)) {
          this.byCategory.set(cat, []);
        }
        this.byCategory.get(cat).push(project);
      }
    }
  }

  get(id) {
    return this.byId.get(id);
  }

  filter(category = "all") {
    if (category === "all") return this.published;
    return this.byCategory.get(category) || [];
  }
}

// Test suite
const mockProjects = [
  { id: "p1", published: true, categories: ["web", "app"], title: "Project 1" },
  { id: "p2", published: true, categories: ["mecatronica"], title: "Project 2" },
  { id: "p3", published: false, categories: ["web"], title: "Draft Project" },
  { id: "p4", published: true, categories: ["web"], title: "Project 4" }
];

const index = new ProjectIndex(mockProjects);

// 1. Filtrado O(1) de publicados
assert.strictEqual(index.published.length, 3, "Draft project must be excluded");
assert.strictEqual(index.get("p3"), undefined, "Draft project should not be in byId index");

// 2. Lookup por id O(1)
assert.strictEqual(index.get("p1")?.title, "Project 1");
assert.strictEqual(index.get("p2")?.title, "Project 2");

// 3. Filtrado por categoría O(1)
const webProjects = index.filter("web");
assert.strictEqual(webProjects.length, 2);
assert.strictEqual(webProjects[0].id, "p1");
assert.strictEqual(webProjects[1].id, "p4");

const mecatronicaProjects = index.filter("mecatronica");
assert.strictEqual(mecatronicaProjects.length, 1);
assert.strictEqual(mecatronicaProjects[0].id, "p2");

const emptyCategory = index.filter("non-existent");
assert.deepStrictEqual(emptyCategory, []);

const allProjects = index.filter("all");
assert.strictEqual(allProjects.length, 3);

console.log("==> Test Unitario Nivel 2: Superado con éxito (Inverted Index O(1) y Map lookups)");
