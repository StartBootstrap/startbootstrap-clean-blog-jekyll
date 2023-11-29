# frozen_string_literal: true

module Unicode
  class DisplayWidth
    VERSION = "2.3.0"
    UNICODE_VERSION = "15.0.0"
    DATA_DIRECTORY = File.expand_path(File.dirname(__FILE__) + "/../../../data/")
    INDEX_FILENAME = DATA_DIRECTORY + "/display_width.marshal.gz"
  end
end
