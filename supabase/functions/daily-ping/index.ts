import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    let body: any = {};
    try { body = await req.json(); } catch {}
    const source = body?.source || 'cron';

    // Ping the database
    const { data, error } = await supabase
      .from('categories')
      .select('id')
      .limit(1)

    const responseTimeMs = Date.now() - startTime;

    if (error) {
      console.error('Database ping error:', error)
      
      // Log failure
      await supabase.from('ping_logs').insert({
        status: 'error',
        source,
        response_time_ms: responseTimeMs,
        error_message: error.message,
      });

      return new Response(
        JSON.stringify({ error: 'Database ping failed', details: error.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Log success
    await supabase.from('ping_logs').insert({
      status: 'success',
      source,
      response_time_ms: responseTimeMs,
    });

    console.log('Database ping successful at:', new Date().toISOString())
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Database pinged successfully',
        timestamp: new Date().toISOString(),
        response_time_ms: responseTimeMs,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    const responseTimeMs = Date.now() - startTime;
    console.error('Function error:', error)

    // Try to log the error
    try {
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
      const supabase = createClient(supabaseUrl, supabaseKey)
      await supabase.from('ping_logs').insert({
        status: 'error',
        source: 'unknown',
        response_time_ms: responseTimeMs,
        error_message: error.message || 'Internal server error',
      });
    } catch {}

    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
