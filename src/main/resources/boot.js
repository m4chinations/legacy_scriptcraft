/*
 This file is the first and only file executed directly from the Java Plugin.
 */
var __scboot = null;
(function(){
  var File = java.io.File,
    FileReader = java.io.FileReader,
    FileOutputStream = java.io.FileOutputStream,
    ZipInputStream = java.util.zip.ZipInputStream,
    jsPlugins = new File('plugins/scriptcraft'),
    initScript = 'lib/scriptcraft.js';

  var unzip = function(path, logger, plugin) {
    var zis = new ZipInputStream(plugin.getResource(path)),
      entry, 
      reason = null, 
      unzipFile = false, 
      zTime = 0,
      fTime = 0, 
      fout = null, 
      c, 
      newFile;

    while ( ( entry = zis.nextEntry ) != null ) {

      newFile = new File(jsPlugins, entry.name);
      if (entry.isDirectory()){
        newFile.mkdirs();
        zis.closeEntry();
        continue;
      }
      reason = null;
      zTime = entry.time;
      unzipFile = false;
      if (!newFile.exists()) {
        reason = 'NE';
        unzipFile = true;
      }else{
      }
      if (unzipFile) {
        logger.info('Unzipping ' + newFile.canonicalPath + ' (' + reason + ')' );
        fout = new FileOutputStream(newFile);
        for (c = zis.read(); c != -1; c = zis.read()) {
          fout.write(c);
        }
        fout.close();
      }
      zis.closeEntry();
    }
    zis.close();
  };
  /*
   Called from Java plugin
   */
  __scboot = function ( plugin, engine )
  {
    var initScriptFile = new File(jsPlugins,initScript);

    engine.eval(new FileReader(initScriptFile));
    __onEnable(engine, plugin, initScriptFile);
  };
})();
