#!/usr/bin/env node

/**
 * Dependency Analyzer for RunHope
 * Checks for unused dependencies and suggests optimizations
 */

const fs = require("fs");
const path = require("path");

class DependencyAnalyzer {
  constructor() {
    this.projectRoot = process.cwd();
    this.packageJsonPath = path.join(this.projectRoot, "package.json");
    this.srcPath = path.join(this.projectRoot, "app");
    this.unusedDeps = [];
    this.usedDeps = new Set();
  }

  /**
   * Analyze dependencies for usage
   */
  async analyze() {
    try {
      console.log("🔍 Analyzing dependencies for RunHope...\n");

      const packageJson = JSON.parse(
        fs.readFileSync(this.packageJsonPath, "utf8")
      );
      const dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      // Scan source files for imports
      await this.scanDirectory(this.srcPath);

      // Check which dependencies are unused
      for (const dep of Object.keys(dependencies)) {
        if (!this.usedDeps.has(dep) && !this.isEssentialDependency(dep)) {
          this.unusedDeps.push(dep);
        }
      }

      this.printResults(dependencies);
      this.printRecommendations();
    } catch (error) {
      console.error("❌ Analysis failed:", error.message);
    }
  }

  /**
   * Recursively scan directory for import statements
   */
  async scanDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        await this.scanDirectory(filePath);
      } else if (this.isSourceFile(file)) {
        this.scanFileImports(filePath);
      }
    }
  }

  /**
   * Scan file for import statements
   */
  scanFileImports(filePath) {
    try {
      const content = fs.readFileSync(filePath, "utf8");

      // Regular expressions for different import patterns
      const importPatterns = [
        /import\s+.*?from\s+['"]([^'"]+)['"]/g, // import ... from 'package'
        /require\(['"]([^'"]+)['"]\)/g, // require('package')
        /import\s+['"]([^'"]+)['"]/g, // import 'package'
      ];

      importPatterns.forEach((pattern) => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const importPath = match[1];
          if (!importPath.startsWith(".") && !importPath.startsWith("/")) {
            // Extract package name (handle scoped packages)
            const packageName = this.extractPackageName(importPath);
            this.usedDeps.add(packageName);
          }
        }
      });
    } catch (error) {
      console.warn(`⚠️ Could not scan ${filePath}:`, error.message);
    }
  }

  /**
   * Extract package name from import path
   */
  extractPackageName(importPath) {
    const parts = importPath.split("/");
    if (importPath.startsWith("@")) {
      // Scoped package: @scope/package
      return parts.slice(0, 2).join("/");
    } else {
      // Regular package: package-name
      return parts[0];
    }
  }

  /**
   * Check if dependency is essential (shouldn't be removed)
   */
  isEssentialDependency(dep) {
    const essentialDeps = [
      "expo",
      "react",
      "react-native",
      "typescript",
      "@babel/core",
      "metro",
    ];

    return essentialDeps.some((essential) => dep.includes(essential));
  }

  /**
   * Check if file should be scanned
   */
  isSourceFile(filename) {
    return /\.(ts|tsx|js|jsx)$/.test(filename);
  }

  /**
   * Print analysis results
   */
  printResults(dependencies) {
    console.log("📊 Dependency Analysis Results:");
    console.log(`📦 Total dependencies: ${Object.keys(dependencies).length}`);
    console.log(`✅ Used dependencies: ${this.usedDeps.size}`);
    console.log(`🔍 Potentially unused: ${this.unusedDeps.length}\n`);

    if (this.unusedDeps.length > 0) {
      console.log("❓ Potentially unused dependencies:");
      this.unusedDeps.forEach((dep) => {
        console.log(`  • ${dep}`);
      });
      console.log();
    }
  }

  /**
   * Print optimization recommendations
   */
  printRecommendations() {
    console.log("💡 Optimization Recommendations:\n");

    if (this.unusedDeps.length > 0) {
      console.log("🗑️  Remove unused dependencies:");
      console.log(`   npm uninstall ${this.unusedDeps.join(" ")}`);
      console.log();
    }

    console.log("🔧 Bundle optimization tips:");
    console.log("  • Use dynamic imports for code splitting");
    console.log("  • Implement tree shaking for unused exports");
    console.log("  • Consider using lighter alternatives for heavy packages");
    console.log("  • Enable production build optimizations");
    console.log();

    console.log("📈 Performance monitoring:");
    console.log("  • Set up bundle size budgets in CI/CD");
    console.log("  • Use webpack-bundle-analyzer for detailed analysis");
    console.log("  • Monitor bundle size changes in pull requests");
    console.log();

    if (this.unusedDeps.length === 0) {
      console.log("✨ Great job! No unused dependencies detected.");
    }
  }
}

// Run analysis if called directly
if (require.main === module) {
  const analyzer = new DependencyAnalyzer();
  analyzer.analyze();
}

module.exports = DependencyAnalyzer;
