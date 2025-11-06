import { execSync } from 'child_process';

/**
 * Remark plugin to add last modified time to frontmatter
 * Uses git to determine the last modification time of a file
 */
export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    
    try {
      const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
      const modifiedTime = result.toString();
      
      if (modifiedTime) {
        file.data.astro.frontmatter = file.data.astro.frontmatter || {};
        file.data.astro.frontmatter.lastModified = modifiedTime;
      }
    } catch (error) {
      // If git command fails (e.g., file not in git), use current time
      file.data.astro.frontmatter = file.data.astro.frontmatter || {};
      file.data.astro.frontmatter.lastModified = new Date().toISOString();
    }
  };
}

