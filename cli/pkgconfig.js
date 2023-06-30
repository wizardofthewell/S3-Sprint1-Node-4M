const fs = require("fs");

function viewPKGConfigFiles() {
  try {
    // Read package-lock.json file
    const packageLockContent = fs.readFileSync("package-lock.json", "utf8");
    console.log("package-lock.json:");
    console.log(packageLockContent);

    // Read package.json file
    const packageJsonContent = fs.readFileSync("package.json", "utf8");
    console.log("package.json:");
    console.log(packageJsonContent);
  } catch (error) {
    console.error("Unable to read config files:", error);
  }
}

function updatePKGConfigFile() {
  try {
    // Update package.json file
    const newConfig = {
      key: "value",
    };
    const packageJsonPath = "package.json";
    const packageJsonContent = JSON.parse(
      fs.readFileSync(packageJsonPath, "utf8")
    );
    const updatedPackageJsonContent = {
      ...packageJsonContent,
      ...newConfig,
    };
    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(updatedPackageJsonContent, null, 2),
      "utf8"
    );

    console.log("Config file updated");
  } catch (error) {
    console.error("Unable to update config file:", error);
  }
}

module.exports = {
  viewPKGConfigFiles,
  updatePKGConfigFile,
};
