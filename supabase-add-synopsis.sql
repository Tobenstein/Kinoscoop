-- Add synopsis support to currently_watching in home_page_content
-- This is a JSONB field, so we just need to update the existing row to include synopsis

-- Example update to add synopsis to your current currently_watching data
-- You can run this after updating the data in The Batcave, or update it manually there

-- No schema changes needed - JSONB fields are flexible
-- Just make sure to save the synopsis field from The Batcave and it will persist

-- To verify the structure, you can run:
-- SELECT currently_watching FROM home_page_content WHERE id = 1;
